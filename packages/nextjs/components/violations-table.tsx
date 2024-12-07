import React from "react";
import { AlertTriangle, Car, Clock, Shield, Zap } from "lucide-react";

// Define violation types with color and icon mappings
const VIOLATION_TYPES = {
  Speeding: {
    color: "bg-red-500 bg-opacity-80",
    icon: <Zap className="w-6 h-6 text-white" />,
    severity: "High Risk",
  },
  "Parking Violation": {
    color: "bg-yellow-500 bg-opacity-80",
    icon: <Car className="w-6 h-6 text-white" />,
    severity: "Medium Risk",
  },
  "Safety Violation": {
    color: "bg-orange-500 bg-opacity-80",
    icon: <Shield className="w-6 h-6 text-white" />,
    severity: "Critical",
  },
  "Traffic Violation": {
    color: "bg-purple-500 bg-opacity-80",
    icon: <AlertTriangle className="w-6 h-6 text-white" />,
    severity: "Moderate Risk",
  },
};

interface Violation {
  id: number;
  location: string;
  violationType: keyof typeof VIOLATION_TYPES;
  timestamp: string;
  fine: number;
}

const ViolationsTable: React.FC = () => {
  // Mock data with more meaningful violation types
  const violations: Violation[] = [
    {
      id: 1,
      location: "I-95 Highway",
      violationType: "Speeding",
      timestamp: "2024-02-15 14:30",
      fine: 0.001,
    },
    {
      id: 2,
      location: "Downtown Parking Zone",
      violationType: "Parking Violation",
      timestamp: "2024-02-16 09:45",
      fine: 0.002,
    },
    {
      id: 3,
      location: "City Center Intersection",
      violationType: "Safety Violation",
      timestamp: "2024-02-17 11:20",
      fine: 0.001,
    },
    {
      id: 4,
      location: "Residential Street",
      violationType: "Traffic Violation",
      timestamp: "2024-02-18 16:55",
      fine: 0.004,
    },
  ];

  const handleClick = (violation: Violation) => () => {
    console.log("Clicked violation:", violation);
    const modal = document.getElementById("my_modal_2");
    const fineElement = modal?.querySelector(".modal-fine");
    if (fineElement) fineElement.textContent = `${violation.fine}`;
    if (modal) (modal as HTMLDialogElement).showModal();
  };

  return (
    <div className="container mx-auto p-2">
      <div className="overflow-x-auto">
        <table className="table table-pin-rows">
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
                <tr key={violation.id} className="hover">
                  {/* Violation Avatar Column */}
                  <td>
                    <div className="flex items-center gap-3">
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
                  <td>{violation.location}</td>

                  {/* Timestamp Column */}
                  <td>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 opacity-50" />
                      {violation.timestamp}
                    </div>
                  </td>

                  {/* Actions Column */}
                  <th>
                    <button className="btn btn-outline text-secondary" onClick={handleClick(violation)}>
                      open modal
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="modal-header">
            <h3>Violation</h3>
          </div>
          <div className="modal-body ">
            <p>
              Fine
              <span className="modal-fine mx-1"></span>
            </p>
            <button className="btn btn-primary mx-1">Pay Fine</button>
            <button className="btn btn-secondary">Appeal</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ViolationsTable;
