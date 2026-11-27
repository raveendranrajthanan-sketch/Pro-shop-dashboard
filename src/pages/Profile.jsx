
import { User, Mail, Shield, Calendar } from "lucide-react";

function Profile() {
  return (
    <div className="dashboard-content">
      <div className="page-heading">
        <div>
          <h2>My Profile</h2>
          <p>Manage your administrator profile information.</p>
        </div>
      </div>

      <div className="profile-page-card">
        <div className="profile-page-avatar">RR</div>
        <h2>Admin User</h2>
        <p>Administrator</p>

        <div className="profile-details">
          <div><User size={18} /><span>Admin User</span></div>
          <div><Mail size={18} /><span>admin@example.com</span></div>
          <div><Shield size={18} /><span>Administrator</span></div>
          <div><Calendar size={18} /><span>Dashboard Member</span></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
