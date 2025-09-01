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
        // Generate 7 data points per column for 7 rows (official LCARS format)
        const dataTypes = [
          () => Math.floor(Math.random() * 99).toString().padStart(2, '0'),          // Short 2-digit
          () => Math.floor(Math.random() * 999).toString(),                          // Medium 3-digit
          () => Math.floor(Math.random() * 9999).toString(),                         // Medium 4-digit
          () => Math.floor(Math.random() * 99999).toString(),                        // Long 5-digit
          () => Math.floor(Math.random() * 999999).toString(),                       // Long 6-digit
          () => Math.floor(Math.random() * 9999999).toString(),                      // Long 7-digit
          () => `${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}`, // Decimal format
          () => `${Math.floor(Math.random() * 99)}-${Math.floor(Math.random() * 99)}`,   // Hyphenated format
        ];
        
        // Generate 7 rows of data per column (matching official LCARS structure)
        const columnData: string[] = [];
        for (let row = 0; row < 7; row++) {
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
                className={`h-4 text-right leading-4 data-cascade-row-${rowIndex + 1} font-mono`}
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