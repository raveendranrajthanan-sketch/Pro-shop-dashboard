
import {
  User,
  Mail,
  Shield,
  Calendar,
  Settings,
  Package,
  Activity,
  BadgeCheck,
  LockKeyhole,
  CircleUserRound,
} from "lucide-react";

function Profile() {
  const profile = {
    name: "Admin User",
    initials: "AU",
    email: "admin@example.com",
    role: "Administrator",
    accountType: "Store Administrator",
    memberSince: "Dashboard Member",
    status: "Active",
  };

  return (
    <div className="dashboard-content premium-profile">

      {/* PROFILE HEADER */}
      <div className="page-heading profile-page-heading">
        <div>
          <span className="profile-eyebrow">
            <CircleUserRound size={14} />
            ACCOUNT MANAGEMENT
          </span>

          <h2>My Profile</h2>
          <p>Manage your administrator profile information.</p>
        </div>

        <span className="profile-active-badge">
          <span></span>
          {profile.status}
        </span>
      </div>

      {/* PROFILE HERO */}
      <div className="profile-hero-card">
        <div className="profile-hero-background"></div>

        <div className="profile-hero-content">
          <div className="profile-page-avatar">
            {profile.initials}
          </div>

          <div className="profile-hero-info">
            <div className="profile-name-row">
              <h2>{profile.name}</h2>
              <BadgeCheck size={19} />
            </div>

            <p>{profile.email}</p>

            <span className="profile-role-badge">
              <Shield size={13} />
              {profile.role}
            </span>
          </div>

          <div className="profile-hero-status">
            <span>ACCOUNT STATUS</span>
            <strong>
              <span></span>
              Active Account
            </strong>
          </div>
        </div>
      </div>

      {/* PROFILE STATISTICS */}
      <div className="profile-stats-grid">

        <div className="profile-stat-card">
          <div className="profile-stat-icon purple">
            <Shield size={20} />
          </div>

          <div>
            <span>Account Role</span>
            <strong>Administrator</strong>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon blue">
            <Activity size={20} />
          </div>

          <div>
            <span>Account Status</span>
            <strong>Active</strong>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon green">
            <Calendar size={20} />
          </div>

          <div>
            <span>Membership</span>
            <strong>Dashboard Member</strong>
          </div>
        </div>

      </div>

      {/* PROFILE DETAILS */}
      <div className="profile-details-layout">

        <section className="profile-details-card">
          <div className="profile-section-heading">
            <div>
              <h3>Personal Information</h3>
              <p>Your administrator account details.</p>
            </div>

            <User size={20} />
          </div>

          <div className="profile-details-list">

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <User size={18} />
              </div>

              <div>
                <span>Full Name</span>
                <strong>{profile.name}</strong>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <Mail size={18} />
              </div>

              <div>
                <span>Email Address</span>
                <strong>{profile.email}</strong>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <Shield size={18} />
              </div>

              <div>
                <span>Account Role</span>
                <strong>{profile.role}</strong>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <Calendar size={18} />
              </div>

              <div>
                <span>Membership</span>
                <strong>{profile.memberSince}</strong>
              </div>
            </div>

          </div>
        </section>

        {/* ACCOUNT INFORMATION */}
        <section className="profile-details-card">
          <div className="profile-section-heading">
            <div>
              <h3>Account Information</h3>
              <p>Administrator account overview.</p>
            </div>

            <Settings size={20} />
          </div>

          <div className="profile-account-info">

            <div className="profile-account-item">
              <span>Account Type</span>
              <strong>{profile.accountType}</strong>
            </div>

            <div className="profile-account-item">
              <span>Access Level</span>
              <strong>Full Admin Access</strong>
            </div>

            <div className="profile-account-item">
              <span>Account Status</span>
              <strong className="profile-account-active">
                <BadgeCheck size={15} />
                Verified Demo
              </strong>
            </div>

          </div>

          <div className="profile-security-note">
            <LockKeyhole size={20} />

            <div>
              <strong>Account Security</strong>
              <p>
                This is a demonstration profile. Authentication
                and profile editing are not connected to a backend.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* PROFILE FOOTER */}
      <div className="profile-footer">
        <Package size={15} />
        Pro Shop Dashboard · Administrator Profile
      </div>

    </div>
  );
}

export default Profile;
