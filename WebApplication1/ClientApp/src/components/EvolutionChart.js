import React from 'react';
import { autobind } from 'core-decorators';
import d3 from 'd3';
import moment from 'moment';
import classNames from 'classnames';

export default class EvolutionChart extends React.Component {
    static propTypes = {
        investment: React.PropTypes.object.isRequired,
        size: React.PropTypes.array,
        wallet: React.PropTypes.object.isRequired
    };

    static defaultProps = {
        size: [0, 0]
    };

    componentDidMount() {
        this.prepareData();

        window.addEventListener('resize', this.prepareSize);
    }

    componentDidUpdate(prevProps) {
        if (this.state.ready) {
            this.plotChart();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.prepareSize);
    }

    prepareData() {
        const investment = this.props.investment;
        const wallet = this.props.wallet;

        const assetsByClass = {};
        const assets = [];
        const firstDate = moment(wallet.requests.data);
        const lastDate = moment(investment.position.data[investment.position.data.length - 1].date).utc();

        Object.keys(investment.assets.data).forEach(d => {
            const asset = investment.assets.data[d];

            if (!assetsByClass[asset.marketingType]) {
                assetsByClass[asset.marketingType] = {};
            }
        });

        assetsByClass.cash = {};

        investment.position.data.forEach(d => {
            Object.keys(assetsByClass).forEach(a => {
                assetsByClass[a][d.date] = 0;
            });

            assetsByClass.cash[d.date] += d.cash;

            Object.keys(d.positions).forEach(e => {
                const asset = d.positions[e];

                assetsByClass[investment.assets.data[e].marketingType][d.date] += asset.value;
            });
        });

        this.interval = d3.time.months;
        this.difference = lastDate.diff(firstDate, 'months', true);
        if (this.difference < 0.5) {
            this.interval = d3.time.days;
        }
        else if (this.difference < 2) {
            this.interval = d3.time.weeks;
        }

        this.xTicks = this.interval(firstDate.toDate(), lastDate.toDate()).length;
        this.xClass = '';
        if (this.xTicks < 7) {
            this.xClass = 'small';
        }
        else if (this.xTicks > 16) {
            this.xClass = 'large';
        }

        Object.keys(assetsByClass).forEach(d => {
            const marketingType = assetsByClass[d];
            const typeData = [];

            investment.position.data.forEach(p => {
                if (moment(p.date).utc().isSameOrAfter(firstDate)) {
                    typeData.push({ date: moment(p.date).utc().format(), value: marketingType[p.date] || 0 });
                }
            });

            assets.push({
                name: d,
                values: typeData
            });
        });

        this.setState({
            data: assets
        }, this.prepareSize);
    }

    @autobind
    prepareSize(e) {
        const props = this.props;

        this.width = props.size[0] || this.container.getBoundingClientRect().width;
        this.height = props.size[1] || this.container.getBoundingClientRect().height;
        this.margin = { top: 15, right: 20, bottom: 30, left: 100 };

        if (window.innerWidth < 600) {
            this.margin.left = 55;
        }

        this.innerWidth = this.width - this.margin.left - this.margin.right;
        this.innerHeight = this.height - this.margin.top - this.margin.bottom;

        this.x = d3.time.scale()
            .range([0, this.innerWidth]);
        this.y = d3.scale.linear()
            .range([this.innerHeight, 0]);

        this.stack = d3.layout.stack()
            .values(d => d.values);

        this.colors = d3.scale.ordinal()
            .range(props.colors);

        this.xAxis = d3.svg.axis()
            .scale(this.x)
            .orient('bottom')
            .ticks(this.interval)
            .tickSize(-(this.height - this.margin.bottom))
            .tickPadding(15)
            .tickFormat(d => moment(d, 'YYYY-MM').utc().format(this.difference < 0.5 ? 'DD/MM' : 'MM/YY'));

        this.yAxis = d3.svg.axis()
            .scale(this.y)
            .orient('left')
            .tickSize(-this.innerWidth)
            .tickPadding(window.innerWidth < 600 ? 5 : 10)
            .tickFormat(d => {
                return `R$ ${d}`;
            });

        this.area = d3.svg.area()
            .x(d => this.x(d.date))
            .y0(d => this.y(d.y0))
            .y1(d => this.y(d.y0 + d.y));

        this.bisectDate = d3.bisector(d => d.date).left;

        if (e && e.type === 'resize') {
            this.forceUpdate();
            d3.select('.evolution-chart__hover').classed('active', false);
            d3.select('.evolution-chart__tooltip').classed('in', false);
        }

        if (!this.state.ready) {
            this.setState({
                ready: true
            });
        }
    }

    plotChart() {
        d3.select(this.container)
            .datum(this.filterData())
            .call(this.update());
    }

    update() {
        const chart = (selection) => {
            selection.each(data => {
                const self = this;

                const assetsByClass = this.stack(data.map(d => ({
                    name: d.name,
                    values: d.values.map(v => ({
                        date: new Date(v.date), y: v.value * 1
                    }))
                })));

                this.colors
                    .range(this.props.colors)
                    .domain(data.map(d => d.name));

                this.x.domain(d3.extent(assetsByClass[0].values, d => d.date));
                this.y.domain([0, d3.sum(assetsByClass, d => d3.max(d.values.map(dd => (dd.y || 0))))]);

                const svg = d3.select(this.container).selectAll('svg').data([assetsByClass]);
                const svgEnter = svg.enter().append('svg');
                const gEnter = svgEnter.append('g');

                gEnter.append('g').attr('class', `axis x ${this.xClass}`);
                gEnter.append('g').attr('class', 'axis y');
                gEnter.append('line').attr('class', 'y__line start');
                gEnter.append('line').attr('class', 'y__line end');
                gEnter.append('g').attr('class', 'assets');

                const hover = gEnter.append('g').attr('class', 'evolution-chart__hover');
                hover.append('line').attr('class', 'hover__line');

                gEnter.append('rect').attr('class', 'evolution-chart__overlay');

                // Update the outer dimensions.
                svg.attr('width', this.width)
                    .attr('height', this.height);

                // Update the inner dimensions.
                const g = svg.select('g')
                    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

                const areas = g.select('.assets').selectAll('.area').data(d => d);

                areas.enter()
                    .append('path')
                    .attr('class', 'area');

                areas.exit().remove();

                const circles = g.select('.evolution-chart__hover').selectAll('.hover__circle').data(d => d);

                circles.enter()
                    .append('circle')
                    .attr('class', 'hover__circle')
                    .attr('r', 4);

                circles.exit().remove();

                g.selectAll('.area')
                    .attr('d', d => this.area(d.values))
                    .style('fill', d => this.colors(d.name));

                g.select('.axis.x')
                    .attr('transform', `translate(0, ${this.innerHeight})`)
                    .call(this.xAxis);

                g.select('.axis.y')
                    .call(this.yAxis);

                g.selectAll('.y__line.start')
                    .attr({
                        x1: 0,
                        y1: -this.margin.top,
                        x2: 0,
                        y2: this.innerHeight
                    });

                g.selectAll('.y__line.end')
                    .attr({
                        x1: this.innerWidth,
                        y1: -this.margin.top,
                        x2: this.innerWidth,
                        y2: this.innerHeight
                    });

                g.selectAll('.hover__line')
                    .attr({
                        x1: 0,
                        y1: -this.margin.top,
                        x2: 0,
                        y2: this.innerHeight
                    });

                g.selectAll('.evolution-chart__overlay')
                    .attr('width', this.innerWidth)
                    .attr('height', this.innerHeight)
                    .style('fill', 'none');
            });
        };

        chart.margin = arg => {
            if (!arg) {
                return this.margin;
            }
            this.margin = arg;
            return chart;
        };

        chart.width = arg => {
            if (!arg) {
                return this.width;
            }
            this.width = arg;
            return chart;
        };

        chart.height = arg => {
            if (!arg) {
                return this.height;
            }
            this.height = arg;
            return chart;
        };

        chart.x = arg => {
            if (!arg) {
                return this.xValue;
            }
            this.xValue = arg;
            return chart;
        };

        chart.y = arg => {
            if (!arg) {
                return this.yValue;
            }
            this.yValue = arg;
            return chart;
        };

        return chart;
    }

    render() {
        const state = this.state;
        const output = {};

        if (state.ready) {
            output.legend = (
                <div className="evolution-chart__legend">
                    {state.data.map((d, i) =>
                            (<a
                                key={i}
                                href="#exclude"
                                className={classNames(d.name, { active: !state.exclude.includes(d.name) })}
                                data-class={d.name}
                                onClick={this.onClickLegend}>
	      <span className="rect" style={{
              backgroundColor: classes[d.name].color,
              color: classes[d.name].color
          }} />
                                <span className="text">
                {classes[d.name].name}
              </span>
                            </a>)
                    )}
                </div>
            );
        }
        else {
            output.main = (<Loader chart={true} />);
        }

        return (
            <div key="EvolutionChart" className="evolution-chart__wrapper">
                <div className="evolution-chart" ref={c => (this.container = c)}>
                    {output.main}
                </div>
                {output.legend}
            </div>
        );
    }
}