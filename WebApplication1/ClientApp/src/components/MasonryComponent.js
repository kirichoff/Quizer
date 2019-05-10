import React from "react";
import { render } from "react-dom";
import {
    CellMeasurer,
    CellMeasurerCache,
    createMasonryCellPositioner,
    Masonry
} from "react-virtualized";
import ImageMeasurer from "react-virtualized-image-measurer";

// Array of images with captions
//const list = [{image: 'http://...', title: 'Foo'}];
const  list = [{image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', title: 'Foo1'},
    {   image: 'https://i.pinimg.com/564x/39/35/81/3935811e936be255d17fff3d42120dcd.jpg', title: 'Foo3'},
    {   image: 'https://i.pinimg.com/564x/39/35/81/3935811e936be255d17fff3d42120dcd.jpg', title: 'Foo3'}
];
// We need to make sure images are loaded from scratch every time for this demo
const noCacheList = list.map((item, index) => ({
    title: index + ". " + item.title,
    image: item.image + (item.image ? "?noCache=" + Math.random() : "")
}));

const keyMapper = (item, index) => item.image || index;

const columnWidth = 200;
const defaultHeight = 250;
const defaultWidth = columnWidth;

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
    defaultHeight,
    defaultWidth,
    fixedWidth: true
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositionerConfig = {
    cellMeasurerCache: cache,
    columnCount: 3,
    columnWidth,
    spacer: 10
};

const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);

const MasonryComponent = ({ itemsWithSizes, setRef }) => {
    const cellRenderer = ({ index, key, parent, style }) => {
        const { item, size } = itemsWithSizes[index];
        const height = columnWidth * (size.height / size.width) || defaultHeight;

        return (
            <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
                <div style={style}>
                    <div>{item.title}</div>
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{
                                height: Math.random() * (400 - 500) + 100,
                                width: Math.random() * (400 - 700) + 100,
                                display: "block"
                            }}
                        />
                    )}
                </div>
            </CellMeasurer>
        );
    };

    return (
        <Masonry
            cellCount={itemsWithSizes.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={600}
            width={800}
            keyMapper={keyMapper}
            ref={setRef}
        />
    );
};

class Index extends React.Component {
    state = { images: noCacheList };

    masonryRef = null;

    // this shows how to significantly change the input array, if items will be only appended this recalculation is not needed
    shorten = () => {
        cache.clearAll();
        cellPositioner.reset(cellPositionerConfig);
        this.masonryRef.clearCellPositions();
        this.setState({ images: [...this.state.images.slice(1)] });
    };

    setMasonry = node => (this.masonryRef = node);

    render() {
        return (
            <div>
                <button onClick={this.shorten}>Resize</button>
                <ImageMeasurer
                    items={this.state.images}
                    image={item => item.image}
                    keyMapper={keyMapper}
                    onError={(error, item, src) => {
                        console.error(
                            "Cannot load image",
                            src,
                            "for item",
                            item,
                            "error",
                            error
                        );
                    }}
                    defaultHeight={defaultHeight}
                    defaultWidth={defaultWidth}
                >
                    {({ itemsWithSizes }) => (
                        <MasonryComponent
                            setRef={this.setMasonry}
                            itemsWithSizes={itemsWithSizes}
                        />
                    )}
                </ImageMeasurer>
            </div>
        );
    }
}

// Render your grid
export  default Index;
