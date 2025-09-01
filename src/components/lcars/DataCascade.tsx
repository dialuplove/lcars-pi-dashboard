import { useEffect, useState } from 'react';

interface DataCascadeProps {
  columns?: number;
  className?: string;
  animated?: boolean;
}

export const DataCascade = ({ columns = 8, className = '', animated = true }: DataCascadeProps) => {
  const [data, setData] = useState<string[][]>([]);

  // Generate random data for cascade
  useEffect(() => {
    const generateData = () => {
      const newData: string[][] = [];
      
      for (let col = 0; col < columns; col++) {
        const columnData: string[] = [];
        for (let row = 0; row < 9; row++) {
          // Generate various types of LCARS-style data
          const dataTypes = [
            () => Math.floor(Math.random() * 999999).toString(),
            () => Math.floor(Math.random() * 99).toString().padStart(2, '0'),
            () => Math.floor(Math.random() * 9999).toString(),
            () => `${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}`,
            () => Math.floor(Math.random() * 999999999).toString(),
            () => `${Math.floor(Math.random() * 99)}-${Math.floor(Math.random() * 999999)}`,
          ];
          
          const randomType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
          columnData.push(randomType());
        }
        newData.push(columnData);
      }
      
      setData(newData);
    };

    generateData();
    
    if (animated) {
      const interval = setInterval(generateData, 3000 + Math.random() * 2000);
      return () => clearInterval(interval);
    }
  }, [columns, animated]);

  if (!animated) {
    return null; // Hide on mobile or when animations are disabled
  }

  return (
    <div className={`flex justify-end overflow-hidden ${className}`}>
      <div className="flex gap-2 font-mono text-xs">
        {data.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col">
            {column.map((value, rowIndex) => (
              <div
                key={`${colIndex}-${rowIndex}`}
                className={`
                  h-4 text-right leading-4
                  ${rowIndex < 2 ? 'data-cascade-row-1' : 
                    rowIndex < 4 ? 'data-cascade-row-2' :
                    rowIndex < 6 ? 'data-cascade-row-3' :
                    'data-cascade-row-4'}
                `}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCascade;