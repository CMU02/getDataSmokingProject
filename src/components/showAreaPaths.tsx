import { Path } from "@/interface/polygonMethodInterface";

export default function ShowAreaPaths({paths} : {paths: Path[]}) {
    return (
      <div>
        <h3>해당 영역 좌표</h3>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Latitude (위도)</th>
              <th>Longitude (경도)</th>
            </tr>
          </thead>
          <tbody>
            {paths.map((path, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{path.lat}</td>
                <td>{path.lng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}