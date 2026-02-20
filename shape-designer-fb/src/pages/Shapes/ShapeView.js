import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createShape, getShape, updateShape } from "../../api/shapeApi";
import ShapeCanvas from "../../components/ShapeCanvas";
import "react-toastify/dist/ReactToastify.css";
import { Square, Circle, Triangle } from "lucide-react";

function ShapeView() {
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
          dimensions.height * dimensions.height,
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
    }
  }, [id]);

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">View Shape</h2>
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
          <div
            className="group relative rounded-xl border bg-card p-5 bg-white shadow"
            key={id}
          >
            {/* Icon badge */}
            {shape === "RECTANGLE" && (
              <div className="mb-3 rounded-xl bg-accent">
                <div className="mb-4 inline-flex rounded-xl p-3 bg-green-100 text-green-600">
                  <Square className="h-7 w-7 " strokeWidth={1.8} />
                </div>

                {/* Name & type */}
                <h3 className="text-lg font-semibold text-card-foreground">
                  {name}
                </h3>
                <span className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-600">
                  {shape === "RECTANGLE" ? "Rectangle" : shape}
                </span>
              </div>
            )}

            {shape === "CIRCLE" && (
              <div className="mb-3 rounded-xl bg-accent">
                <div className="mb-4 inline-flex rounded-xl p-3 bg-blue-100 text-blue-600">
                  <Circle className="h-7 w-7 " strokeWidth={1.8} />
                </div>

                {/* Name & type */}
                <h3 className="text-lg font-semibold text-card-foreground">
                  {name}
                </h3>
                <span className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-600">
                  {shape === "CIRCLE" ? "Circle" : shape}
                </span>
              </div>
            )}

            {shape === "TRIANGLE" && (
              <div className="mb-3 rounded-xl bg-accent">
                <div className="mb-4 inline-flex rounded-xl p-3 bg-yellow-100 text-yellow-600">
                  <Triangle className="h-7 w-7 " strokeWidth={1.8} />
                </div>

                {/* Name & type */}
                <h3 className="text-lg font-semibold text-card-foreground">
                  {name}
                </h3>
                <span className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-600">
                  {shape === "TRIANGLE" ? "Triangle" : shape}
                </span>
              </div>
            )}

            {/* Dimensions */}
            {(shape === "RECTANGLE" || shape === "TRIANGLE") && (
              <div>
                <div className="mt-4 flex gap-4 border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Width</p>
                    <p className="text-sm font-semibold text-card-foreground">
                      {dimensions.width}cm
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Height</p>
                    <p className="text-sm font-semibold text-card-foreground">
                      {dimensions.height}cm
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-4 border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Area</p>
                    <p className="text-sm font-semibold text-green-600">
                      {area} cm<sup>2</sup>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Perimeter</p>
                    <p className="text-sm font-semibold text-green-600">
                      {perimeter} cm
                    </p>
                  </div>
                </div>
              </div>
            )}

            {shape === "CIRCLE" && (
              <div>
                <div className="mt-4 flex gap-4 border-t pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Radius</p>
                  <p className="text-sm font-semibold text-card-foreground">
                    {dimensions.radius}cm
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Area</p>
                  <p className="text-sm font-semibold text-green-600">
                    {area} cm<sup>2</sup>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-4 border-t pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Perimeter</p>
                  <p className="text-sm font-semibold text-green-600">
                    {perimeter}
                  </p>
                </div>
                {shape === "CIRCLE" && (
                  <div>
                    <p className="text-xs text-muted-foreground">Diameter</p>
                    <p className="text-sm font-semibold text-green-600">
                      {diameter}cm
                    </p>
                  </div>
                )}
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShapeView;
