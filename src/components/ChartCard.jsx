
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ChartCard({ products = [] }) {
  const chartData = products.slice(0, 8).map((product) => ({
    name:
      product.title.length > 12
        ? product.title.slice(0, 12) + "..."
        : product.title,
    price: Number(product.price || 0),
  }));

  return (
    <div className="chart-card responsive-chart-card">
      <div className="chart-heading responsive-chart-heading">
        <div>
          <h3>Product Price Analytics</h3>
          <p>Price comparison of latest products</p>
        </div>

        <span className="chart-period">Latest 8 Products</span>
      </div>

      <div className="chart-container responsive-chart-container">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 15,
                right: 12,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#edf0f5"
              />

              <XAxis
                dataKey="name"
                interval={0}
                tick={{ fill: "#8994a6", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />

              <YAxis
                width={45}
                tick={{ fill: "#8994a6", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #edf0f5",
                  fontSize: "12px",
                }}
              />

              <Bar
                dataKey="price"
                name="Product Price"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No chart data available.</p>
        )}
      </div>
    </div>
  );
}

export default ChartCard;
