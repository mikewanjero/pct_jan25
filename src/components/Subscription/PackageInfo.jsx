/* eslint-disable react/prop-types */

export default function PackageInfo({ companyName, packageInfo }) {
  return (
    <>
      <div className="w-100 border p-3 rounded shadow bg-light mb-2">
        <h2 className="fw-semibold text-center">{companyName}</h2>
        <h2
          className="text-caramel fw-semibold text-center"
          style={{ fontSize: "1.5rem", color: "#c58c4f" }}
        >
          <p>Package: {packageInfo.name}</p>
        </h2>

        <div className="d-flex justify-content-around mt-2">
          <div className="text-center">
            <p>
              <strong>Branches: </strong>
              {packageInfo.branches}
            </p>
          </div>
          <div className="text-center">
            <p>
              <strong>Users: </strong>
              {packageInfo.users}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
