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
        // Generate 4 data points per column for 4 rows
        const dataTypes = [
          () => Math.floor(Math.random() * 99).toString().padStart(2, '0'),
          () => Math.floor(Math.random() * 999).toString(),
          () => Math.floor(Math.random() * 9999).toString(),
          () => Math.floor(Math.random() * 99999).toString(),
          () => Math.floor(Math.random() * 999999999).toString(),
          () => `${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}`,
        ];
        
        // Generate 4 rows of data per column
        const columnData: string[] = [];
        for (let row = 0; row < 4; row++) {
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
      <div className="flex gap-6 font-mono text-sm opacity-80">
        {data.map((column, colIndex) => (
          <div
            key={colIndex}
            className="data-column space-y-1"
            style={{
              animationDelay: `${colIndex * 0.1}s`
            }}
          >
            {column.map((value, rowIndex) => (
              <div
                key={`${colIndex}-${rowIndex}`}
                className={`h-4 text-right leading-4 dc-row-${rowIndex + 1} animate-pulse`}
                style={{
                  animationDelay: `${(colIndex * 0.1) + (rowIndex * 0.05)}s`,
                  animationDuration: '2s'
                }}
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