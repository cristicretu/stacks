function isLink(str: string) {
  const websiteRegex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9_-]+\.[a-zA-Z]+(\/\S*)?$/
  return websiteRegex.test(str)
}

function shortenLink(str: string) {
  // if it starts with http:// or https://
  if (/^(http|https):\/\/[^ "]+$/.test(str)) {
    // remove http:// or https://
    return str.replace(/^(http|https):\/\//, '')
  }
  return str
}

export { isLink, shortenLink }
