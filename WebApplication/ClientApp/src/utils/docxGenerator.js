
import { Document, Packer, Paragraph, TextRun,Table, TableCell, TableRow,UnderlineType,TabStopPosition,TabStopType,WidthType,HeadingLevel,AlignmentType }  from "docx"

 const getDoc = async function({title,headers,body,description,info})
{

    let option = {styles: {
            paragraphStyles: [
                {
                    id: "Heading1",
                    name: "Heading 1",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        size: 38,
                    },
                    paragraph: {
                        spacing: {
                            after: 120,
                        },
                    }
                },   {
                    id: "Heading3",
                    name: "Heading 3",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        size: 24,
                    },
                    paragraph: {
                        spacing: {
                            after: 120,
                        },
                    }
                },
                {
                    id: "Heading2",
                    name: "Heading 2",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        size: 25,
                        bold: true
                    },
                    paragraph: {
                        spacing: {
                            after: 120,
                        },
                    },
                }]}}

    let Header = (name) =>[new Paragraph({
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_1,
        children: [
            new TextRun(`${name}`),
        ],
    }),new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun(``),
        ],
    }),];



    let table = ({header,body})=>{

        let tableHeader = header.map(head=>
            new TableCell({
            children: [new Paragraph({
                alignment: AlignmentType.CENTER,
                heading: HeadingLevel.HEADING_2,
                children: [
                    new TextRun(head),
                ],
            })],
        }), )
        let tableBody = body.map(row=> new TableRow ({children: [ ...row.map(cell=>
            new TableCell({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun(cell.toString()),
                    ],
                })],
            }),)]}));
      return new Table({
          width:{
            size: 9535,
              type: WidthType.DXA,
          },
          rows: [
              new TableRow({
                  children: [
                      ...tableHeader
                  ],
              }),
              ...tableBody
          ],
      });
    }

    const doc = new Document(option);

    doc.addSection({
            children:[
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    heading: HeadingLevel.HEADING_3,
                    children:[
                        new TextRun("Частное учреждение образования")
                    ]
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    heading: HeadingLevel.HEADING_3,
                    children:[
                        new TextRun("«Колледж бизнеса и права»")
                    ]
                }),
                ...Header("Отчет по результатам тестирования по работе: "+title),
                new Paragraph(''),
                new Paragraph(''),
                new Paragraph(''),
                new Paragraph(''),
                new Paragraph(''),
                new Paragraph({
                    children:[
                        new TextRun('Автор теста: '+info.user ),
                        ]
                }),
                new Paragraph(
                    'Количество вопросов: ' + info.count
                ),
                new Paragraph(
                    'Максимальное количество баллов: ' + info.points
                ),
                ...description? [new Paragraph(description),new Paragraph("")] : [new Paragraph("")],
                table({header: headers,body: body})
            ]
        });
    return await Packer.toBase64String(doc);
}
export default getDoc;