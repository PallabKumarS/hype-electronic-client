function TextColor(value) {
  if (value == "Pending") {
    return <span className="text-yellow-500">{value}</span>;
  } else if (value == "In Progress") {
    return <span className="text-blue-500">{value}</span>;
  } else {
    return <span className="text-lime-500">{value}</span>;
  }
}

export default TextColor;
