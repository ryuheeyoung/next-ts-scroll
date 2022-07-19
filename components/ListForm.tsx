import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

const ListBox = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  box-shadow: 1px 1px 3px ${(props) => props.theme.colors.shadowColor};
  overflow-y: auto;
  & > table {
    width: 100%;
    position: static;
    border-spacing: 0;
    border-collapse: collapse;
    & thead {
      position: sticky;
      top: 0;
      background: ${(props) => props.theme.colors.white};
      & th {
        border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
      }
    }
  }
`;

// 테이블리스트 내용 정렬 옵션
type alignType = "center" | "left" | "right" | "justify" | "char";

// table column type
export interface Column {
  key: string;
  title: string;
  render?: (
    value: any,
    record?: any,
    index?: number,
    list?: any[]
  ) => React.ReactElement | string;
  width?: string;
  align?: alignType;
}

// table header type
interface Header {
  key: string;
  title: string;
  width: string;
}

// table row data type
interface DataRow {
  key: string;
  width: string;
  render: React.ReactElement;
  align: string;
}

// component props type
type ListProps = {
  columns?: Column[];
  dataList?: any[];
  className?: string;
};

const ListForm = ({ columns, dataList, className }: ListProps) => {
  const [data, setData] = useState<DataRow[][]>([]); // dataSource
  const [headers, setHeaders] = useState<Header[]>([]); // table header

  /**
   * calculate table cell width
   * @param a
   * @param b
   * @returns css calc width
   */
  const getWidthStr = (a: string, b: Column): string => {
    if (b.width) {
      a += ` + ${b.width}`;
    }
    return a;
  };

  useEffect(() => {
    if (Array.isArray(columns) && Array.isArray(dataList)) {
      const width_count = columns.filter((c) => !c.width).length;
      const calc_width = columns.reduce(getWidthStr, "0");

      const parseColumns = columns.map((c) => {
        let width: string;
        if (c.width) {
          width = c.width;
        } else {
          width = `calc((100% - (${calc_width})) / ${width_count})`;
        }

        return { key: c.key, title: c.title, width };
      });
      setHeaders(parseColumns);

      const parseList: DataRow[][] = dataList.map((d, i) => {
        const parseRow: DataRow[] = columns.map((c) => {
          const width = parseColumns.find((pc) => pc.key === pc.key).width;
          const render = React.createElement(
            "p",
            null,
            c.render ? c.render(d[c.key], d, i, dataList) : d[c.key]
          ) as ReactElement;

          return { key: d.key, width, render, align: c.align || "left" };
        });

        return parseRow;
      });
      setData(parseList);
    } else {
      setHeaders([]);
      setData([]);
    }
  }, [columns, dataList]);

  return (
    <ListBox className={className}>
      <table>
        <thead>
          <tr>
            {headers &&
              headers.map((h) => (
                <th key={h.key}>
                  <p>{h.title}</p>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((column, i) => (
            <tr key={`row-${i}`}>
              {column.map(({ key, width, render, align }, i) => (
                <td
                  key={`col-${key}-${i}`}
                  style={{
                    width,
                  }}
                  align={align as alignType}
                >
                  {render}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ListBox>
  );
};

export default ListForm;
