export default function collectIdsAndDocs(doc) {
  return { id: doc.id, ...doc.data() };
}
