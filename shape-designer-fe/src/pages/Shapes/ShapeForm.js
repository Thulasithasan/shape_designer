import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createShape, getShape, updateShape } from "../../api/shapeApi";
import ShapeCanvas from "../../components/ShapeCanvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShapeForm() {
  const [name, setName] = useState("");

  const [shape, setShape] = useState("RECTANGLE");
  const [dimensions, setDimensions] = useState({
    width: 0.0,
    height: 0.0,
    radius: 0.0,
  });
  const [area, setArea] = useState(0);
    const [perimeter, setPerimeter] = useState(0);
    const [diameter, setDiameter] = useState(0);
  const { id } = useParams(); // id is undefined in create mode
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const calculateProperties = () => {
    let a = 0;
    let p = 0;
    let d = 0;

    if (shape === "RECTANGLE") {
      a = dimensions.width * dimensions.height;
      p = 2 * (dimensions.width + dimensions.height);
    }

    if (shape === "TRIANGLE") {
      a = 0.5 * dimensions.width * dimensions.height;
      const hyp = Math.sqrt(
        dimensions.width * dimensions.width +
          dimensions.height * dimensions.height
      );
      p = dimensions.width + dimensions.height + hyp;
    }

    if (shape === "CIRCLE") {
      a = Math.PI * dimensions.radius * dimensions.radius;
      p = 2 * Math.PI * dimensions.radius;
      d = 2 * dimensions.radius;
    }

    setArea(a.toFixed(2));
    setPerimeter(p.toFixed(2));
    setDiameter(d.toFixed(2));
  };

  useEffect(() => {
    calculateProperties();
  }, [shape, dimensions]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getShape(id)
        .then((res) => {
          const data = res.data;
          setName(data.name);
          setShape(data.type);
          setDimensions({
            width: data.dimensionData.width || 0,
            height: data.dimensionData.height || 0,
            radius: data.dimensionData.radius || 0,
          });
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }else {
    setName("");
    setShape("RECTANGLE");
    setDimensions({
      width: 0,
      height: 0,
      radius: 0,
    });
    setArea(0);
    setPerimeter(0);
    setDiameter(0);
    setErrors({});
  }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const payload = { name, type: shape, dimension: dimensions };

    try {
      let res;
      if (id) {
        res = await updateShape(id, payload);
      } else {
        res = await createShape(payload);
      }

      if (res?.success) {
        toast.success(res?.message || "Shape saved successfully!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(res?.message || "Failed to save shape.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving the shape.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!name.trim()) {
      tempErrors.name = "Name is required";
    }

    if (shape !== "CIRCLE") {
      if (!dimensions.width || dimensions.width <= 0) {
        tempErrors.width = "Width must be greater than 0";
      }
      if (!dimensions.height || dimensions.height <= 0) {
        tempErrors.height = "Height must be greater than 0";
      }
    }

    if (shape === "CIRCLE") {
      if (!dimensions.radius || dimensions.radius <= 0) {
        tempErrors.radius = "Radius must be greater than 0";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Shape" : "Create Shape"}
      </h2>
      {loading ? (
        <p>Loading ...</p> // Simple loading state
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-3 max-h-max">
              <ShapeCanvas
                canvasWidth={1020}
                canvasHeight={600}
                shape={shape}
                dimensions={dimensions}
              />
            </div>

            <div className="col-span-1 bg-white p-6 rounded-xl shadow">
              {/* <h2 className="text-xl font-semibold mb-4">Create Shape</h2> */}

              <label className="block font-medium">Name</label>
              <input
                type="text"
                value={name}
                placeholder="Enter name"
                className="w-full p-2 border rounded"
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

              <label className="block mt-2 font-medium">Select Shape</label>
              <select
                className="w-full p-2 border rounded mb-4"
                value={shape}
                onChange={(e) => setShape(e.target.value)}
              >
                <option value="RECTANGLE">Rectangle</option>
                <option value="CIRCLE">Circle</option>
                <option value="TRIANGLE">Triangle</option>
                required
              </select>

              {shape !== "CIRCLE" && (
                <div className="mt-2">
                    <label className="block font-medium">Shape Dimensions</label>
                  <label className="block text-sm text-gray-500">Width(cm)</label>
                  <input
                    type="number"
                    placeholder="Width"
                    value={dimensions.width}
                    min="0.01"
                    step="0.01"
                    className="w-full p-2 border rounded"
                    onChange={(e) =>
                      setDimensions({ ...dimensions, width: +e.target.value })
                    }
                    required
                  />
                  {errors.width && (
                    <p className="text-red-500 text-sm">{errors.width}</p>
                  )}

                  <label className="block text-sm text-gray-500">Height(cm)</label>
                  <input
                    type="number"
                    placeholder="Height"
                    value={dimensions.height}
                    min="0.01"
                    step="0.01"
                    className="w-full p-2 border rounded"
                    onChange={(e) =>
                      setDimensions({ ...dimensions, height: +e.target.value })
                    }
                    required
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm">{errors.height}</p>
                  )}
                </div>
              )}

              {shape === "CIRCLE" && (
                <div className="mb-3">
                    <label className="block font-medium">Shape Dimensions</label>
                  <label className="block text-sm text-gray-500">Radius(cm)</label>
                  <input
                    type="number"
                    placeholder="Radius"
                    value={dimensions.radius}
                    className="w-full p-2 border rounded mb-3"
                    onChange={(e) =>
                      setDimensions({ ...dimensions, radius: +e.target.value })
                    }
                    required
                  />
                  {errors.radius && (
                    <p className="text-red-500 text-sm">{errors.radius}</p>
                  )}
                </div>
              )}

              
              <div className="mt-4 font-semibold">
                <label className="block mt-2 font-medium">Shape Properties</label>
                <p className="font-light">Area: <span className="text-green-600">{area} cm<sup>2</sup></span></p>
                <p className="font-light">Perimeter: <span className="text-green-600">{perimeter} cm</span></p>
                {shape === "CIRCLE" && (
                  <p className="font-light">Diameter: <span className="text-green-600">{diameter} cm</span></p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-2 mt-4 rounded hover:bg-indigo-700"
              >
                Save Shape
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ShapeForm;
