interface data<T> {
  first: T;
  second: T;
}

interface props {
  label: string;
  value: data<number>;
  login: data<string>;
}

export default function DiffComponent({ label, value, login }: props) {
  const percentage: data<number> = {
    first: (value.first / (value.first + value.second)) * 100,
    second: (value.second / (value.first + value.second)) * 100,
  };
  console.log("percentage", percentage);
  return (
    <div
      key={label}
      className="border border-border p-6 bg-primary-container rounded-2xl"
    >
      <h3 className="text-center font-semibold text-on-primary-container mb-6">
        {label}
      </h3>

      {/* Comparison bars */}
      <div className="space-y-4">
        {/* Dev 1 */}
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-on-muted-primary">{login.first}</p>
            <p className="font-bold text-on-secondary">{value.first}</p>
          </div>
          <div className="w-full bg-muted-primary rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${percentage.first || 0}%` }}
            />
          </div>
        </div>

        {/* Dev 2 */}
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-on-muted-primary">{login.second}</p>
            <p className="font-bold text-on-secondary">{value.second}</p>
          </div>
          <div className="w-full bg-muted-primary rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all"
              style={{ width: `${percentage.second || 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
