import React, { useState, useEffect } from "react";
import ShapeCanvas from "../../components/ShapeCanvas";
import { createShape, getShapes, deleteShape } from "../../api/shapeApi";
import { FaTrash, FaRegSquare, FaRegCircle, FaPlay } from "react-icons/fa";
import { Square, Circle, Triangle, Shapes, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal";

const shapeConfig = {
  RECTANGLE: {
    icon: Square,
    colorClass: "text-primary",
    bgClass: "bg-accent",
    label: "Rectangle",
  },
  CIRCLE: {
    icon: Circle,
    colorClass: "text-[hsl(var(--shape-circle))]",
    bgClass: "bg-[hsl(var(--shape-circle)/0.1)]",
    label: "Circle",
  },
  TRIANGLE: {
    icon: Triangle,
    colorClass: "text-[hsl(var(--shape-triangle))]",
    bgClass: "bg-[hsl(var(--shape-triangle)/0.1)]",
    label: "Triangle",
  },
};

function ShapeList() {
  const navigate = useNavigate();
  const [shape, setShape] = useState("RECTANGLE");
  const [name, setName] = useState("");
  const [dimensions, setDimensions] = useState({
    width: 0.0,
    height: 0.0,
    radius: 0.0,
  });
  const [area, setArea] = useState(0);
  const [shapes, setShapes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleArea = (type, width, height, radius) => {
    if (type === "RECTANGLE") return (width * height).toFixed(2);
    if (type === "CIRCLE") return (Math.PI * radius * radius).toFixed(2);
    if (type === "TRIANGLE") return (0.5 * width * height).toFixed(2);
  };

  const loadShapes = async () => {
    const data = await getShapes();
    setShapes(data.data);
  };

  useEffect(() => {
    loadShapes();
  }, []);

  const handleDeleteClick = (shape) => {
    setSelectedId(shape.id);
    setSelectedShape(shape);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    const res = await deleteShape(selectedId);
    if (res.success) {
      toast.success(res?.message || "Shape deleted successfully!");
      loadShapes();
    } else {
      toast.error(res?.message || "Failed to delete shape.");
    }
    setShowModal(false);
    setSelectedId(null);
  };

  const handleFilterShapes = (shapes, query) => {
    if (!query) return shapes;
    return shapes.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.type.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-100 p-2.5">
            <Shapes className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Shape List</h1>
            <p className="text-sm text-muted-foreground">
              {shapes.length} shapes in your collection
            </p>
          </div>
        </div>

        {/* Right side: search bar */}
        <div>
          <input
            type="text"
            placeholder="Search shapes..."
            className="border rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {shapes
          .filter(
            (s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.type.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((s) => (
            <div
              className="group relative rounded-xl border bg-card p-5 bg-white shadow cursor-pointer transform transition-transform duration-300 hover:scale-105"
              key={s.id}
              onClick={(e) => {
                if (e.target.closest("button")) return;
                navigate(`/shape/view/${s.id}`);
              }}
            >
              <button
                onClick={() => handleDeleteClick(s)}
                className={`absolute top-3 right-3 rounded-lg p-2.5 transition-opacity
    ${
      s.name === "Default Circle" ||
      s.name === "Default Rectangle" ||
      s.name === "Default Triangle"
        ? "opacity-50 cursor-not-allowed" // disabled style
        : "group-hover:opacity-100 hover:bg-red-100 hover:text-red-600"
    }`}
                title="Delete"
                disabled={
                  s.name === "Default Circle" ||
                  s.name === "Default Rectangle" ||
                  s.name === "Default Triangle"
                }
              >
                <Trash2 className="h-4 w-4" />
              </button>

              {/* Icon badge */}
              {s.type === "RECTANGLE" && (
                <div className="mb-3 rounded-xl bg-accent">
                  <div className="mb-4 inline-flex rounded-xl p-3 bg-green-100 text-green-600">
                    <Square className="h-7 w-7 " strokeWidth={1.8} />
                  </div>

                  {/* Name & type */}
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {s.name}
                  </h3>
                  <span className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-600">
                    {s.type === "RECTANGLE" ? "Rectangle" : s.type}
                  </span>
                </div>
              )}

              {s.type === "CIRCLE" && (
                <div className="mb-3 rounded-xl bg-accent">
                  <div className="mb-4 inline-flex rounded-xl p-3 bg-blue-100 text-blue-600">
                    <Circle className="h-7 w-7 " strokeWidth={1.8} />
                  </div>

                  {/* Name & type */}
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {s.name}
                  </h3>
                  <span className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-600">
                    {s.type === "CIRCLE" ? "Circle" : s.type}
                  </span>
                </div>
              )}

              {s.type === "TRIANGLE" && (
                <div className="mb-3 rounded-xl bg-accent">
                  <div className="mb-4 inline-flex rounded-xl p-3 bg-yellow-100 text-yellow-600">
                    <Triangle className="h-7 w-7 " strokeWidth={1.8} />
                  </div>

                  {/* Name & type */}
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {s.name}
                  </h3>
                  <span className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-600">
                    {s.type === "TRIANGLE" ? "Triangle" : s.type}
                  </span>
                </div>
              )}

              <button
                onClick={() => navigate(`/shape/${s.id}`)}
                className={`absolute bottom-3 right-3 rounded-lg p-2.5 transition-opacity
    ${
      s.name === "Default Circle" ||
      s.name === "Default Rectangle" ||
      s.name === "Default Triangle"
        ? "opacity-50 cursor-not-allowed" // disabled look
        : "group-hover:opacity-100 hover:bg-green-100 hover:text-green-600"
    }`}
                title={
                  s.name.startsWith("Default")
                    ? "Cannot edit default shape"
                    : "Edit"
                }
                disabled={
                  s.name === "Default Circle" ||
                  s.name === "Default Rectangle" ||
                  s.name === "Default Triangle"
                }
              >
                <Edit
                  className={`h-4 w-4 ${s.name.startsWith("Default") ? "text-gray-400" : "text-green-600"}`}
                />
              </button>

              {/* Dimensions */}
              {(s.type === "RECTANGLE" || s.type === "TRIANGLE") && (
                <div className="mt-4 flex gap-4 border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Width</p>
                    <p className="text-sm font-semibold text-card-foreground">
                      {s.dimensionData.width}<span className="text-xs">cm</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Height</p>
                    <p className="text-sm font-semibold text-card-foreground">
                      {s.dimensionData.height}<span className="text-xs">cm</span>
                    </p>
                  </div>
                  {/* <div>
                    <p className="text-xs text-muted-foreground">Area</p>
                    <p className="text-sm font-semibold text-green-600">
                      {handleArea(
                        s.type,
                        s.dimensionData.width,
                        s.dimensionData.height,
                        s.dimensionData.radius,
                      )}<span className="text-xs">cm<sup>2</sup></span> 
                    </p>
                  </div> */}
                </div>
              )}
              {s.type === "CIRCLE" && (
                <div className="mt-4 flex gap-4 border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Radius</p>
                    <p className="text-sm font-semibold text-card-foreground">
                      {s.dimensionData.radius}  <span className="text-xs">cm</span> 
                    </p>
                  </div>
                  {/* <div>
                    <p className="text-xs text-muted-foreground">Area</p>
                    <p className="text-sm font-semibold text-green-600">
                      {handleArea(
                        s.type,
                        s.dimensionData.width,
                        s.dimensionData.height,
                        s.dimensionData.radius,
                      )} <span className="text-xs">cm<sup>2</sup></span> 
                    </p>
                  </div> */}
                </div>
              )}
            </div>
          ))}
      </div>
      <ConfirmModal
        show={showModal}
        onConfirm={handleConfirmDelete}
        message={
          selectedShape
            ? `Are you sure you want to delete the shape "${selectedShape.name}" of type "${selectedShape.type}"?`
            : "Are you sure?"
        }
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default ShapeList;
