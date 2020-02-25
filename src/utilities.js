export default function collectIdsAndDocs(doc) {
  return { id: doc.id, ...doc.data() };
}

export function getDay() {
  const date = new Date().toJSON().slice(0, 10);
  return date;
}
