import { useMemo } from "react";
// qrcode-generator ships a UMD-ish default export.
import qrcode from "qrcode-generator";

type Props = {
  value: string;
  size?: number;
  bg?: string;
  fg?: string;
  title?: string;
};

export default function QRCode({
  value,
  size = 160,
  bg = "#FFFFFF",
  fg = "#2B2B2B",
  title = "QR code",
}: Props) {
  const modules = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(value);
    qr.make();
    const count = qr.getModuleCount();
    const grid: boolean[][] = [];
    for (let r = 0; r < count; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < count; c++) row.push(qr.isDark(r, c));
      grid.push(row);
    }
    return { grid, count };
  }, [value]);

  const { grid, count } = modules;
  const cell = 1;
  const totalCells = count;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${totalCells} ${totalCells}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={title}
    >
      <rect width={totalCells} height={totalCells} fill={bg} />
      {grid.map((row, r) =>
        row.map((on, c) =>
          on ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill={fg} /> : null
        )
      )}
    </svg>
  );
}
