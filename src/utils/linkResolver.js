exports.linkResolver = doc => {
  switch (doc.type) {
    case "product":
      return `/${doc.uid}`
    case "casestudy":
      return `/${doc.uid}`
    case "blogpost":
      return `/${doc.uid}`
    default:
      return "/"
  }
}
