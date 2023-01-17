export default function (ms: number) {
  return new Promise(resolve => setTimeout(() => {
    resolve('ok')
  }, ms))
}
