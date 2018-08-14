
module.exports = {
  template(ctx, body) {
    return `
    <a href="${ctx.request.headers.origin}">
      <img width="200px" src="${ctx.request.headers.origin}/logo/NN_horiz.png" alt="logo">
    </a>
    ${body}
    Footer
    `
  }
}
