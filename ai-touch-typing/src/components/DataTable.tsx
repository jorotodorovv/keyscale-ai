import { ReactNode } from 'react';

interface DataTableProps {
  headers: string[];
  data: ReactNode[][];
  className?: string;
}

const DataTable = ({ headers, data, className = '' }: DataTableProps) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400">
            {headers.map((header, index) => (
              <th key={index} className="pb-2 px-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-800 hover:bg-gray-800 hover:bg-opacity-50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-3 px-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;