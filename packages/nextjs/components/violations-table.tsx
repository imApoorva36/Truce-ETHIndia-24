import React from "react";
import { AlertTriangle, Car, Clock, Shield, Zap } from "lucide-react";

// Define violation types with color and icon mappings
const VIOLATION_TYPES = {
  "Speeding": {
    color: "bg-red-500 bg-opacity-80",
    icon: <Zap className="w-6 h-6 text-white" />,
    severity: "High Risk",
  },
  "Parking": {
    color: "bg-yellow-500 bg-opacity-80",
    icon: <Car className="w-6 h-6 text-white" />,
    severity: "Medium Risk",
  },
  "Red Light": {
    color: "bg-orange-500 bg-opacity-80",
    icon: <Shield className="w-6 h-6 text-white" />,
    severity: "Critical",
  },
  "Wrong Way": {
    color: "bg-purple-500 bg-opacity-80",
    icon: <AlertTriangle className="w-6 h-6 text-white" />,
    severity: "Moderate Risk",
  },
};

interface Violation {
  violationType: "Speeding" | "Parking" | "Red Light" | "Wrong Way",
  area: string,
  fineAmount: bigint,
  isPaid: boolean,
  time: bigint
}

const ViolationsTable: React.FC<{violations: readonly Violation[]}> = ({ violations }) => {
  // Mock data with more meaningful violation types

  const [openModal, setOpenModal] = React.useState(-1);

  return (
    <div className="container mx-auto p-2">
      <div className="overflow-x-auto">
        <table className="table table-pin-rows text-center">
          <thead>
            <tr className="bg-base-200">
              <th>Violation Details</th>
              <th>Location</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {violations.map(violation => {
              const violationInfo = VIOLATION_TYPES[violation.violationType];
              return (
                <tr key={violation.time} className="hover">
                  {/* Violation Avatar Column */}
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <div className="avatar placeholder">
                        <div
                          className={`w-12 h-12 rounded-full ${violationInfo.color} flex items-center justify-center`}
                        >
                          {violationInfo.icon}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{violation.violationType}</div>
                        <span className="font-xs mx-1">{violationInfo.severity}</span>
                      </div>
                    </div>
                  </td>

                  {/* Location Column */}
                  <td>{violation.area}</td>

                  {/* Timestamp Column */}
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 opacity-50" />
                      {(new Date(parseInt(violation.time.toString()))).toString()}
                    </div>
                  </td>

                  {/* Actions Column */}
                  <th>
                    <button className="btn btn-outline text-secondary" onClick={() => setOpenModal(violation.id)}>
                      open modal
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {openModal && openModal > 0 && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Violation Details</h3>
            <div className="py-4">
              <div className="mt-4 text-center">
                <div className="stat">
                  <div className="stat-title">Fine Amount</div>
                  <div className="stat-value text-primary">{violations[openModal].fine}</div>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={() => setOpenModal(-1)}>
                Pay Fine
              </button>
              <button className="btn btn-ghost" onClick={() => setOpenModal(-1)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ViolationsTable;
