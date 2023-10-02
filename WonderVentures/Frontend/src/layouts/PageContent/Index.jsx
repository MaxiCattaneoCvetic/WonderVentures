/* eslint-disable react/prop-types */

function Index({ title, children }) {
  return (
    <div>
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
}

export default Index;
