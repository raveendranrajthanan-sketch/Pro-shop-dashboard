
function DashboardCard({ title, value, icon: Icon, color }) {
  const descriptions = {
    "Total Products": "Products available in your store",
    Categories: "Different product categories",
    "Total Stock": "Units currently available",
    "Low Stock": "Products need restocking",
  };

  const description =
    descriptions[title] || "Your store performance overview";

  return (
    <div className={`dashboard-card card-${color}`}>
      <div className="dashboard-card-top">
        <div>
          <p className="dashboard-card-title">{title}</p>
          <h3 className="dashboard-card-value">{value}</h3>
        </div>

        <div className="dashboard-card-icon">
          <Icon size={24} strokeWidth={2} />
        </div>
      </div>

      <div className="dashboard-card-bottom">
        <span className="dashboard-card-label">
          {description}
        </span>
      </div>
    </div>
  );
}

export default DashboardCard;
