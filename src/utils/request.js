class Request {
  setSiteType(siteType) {
      this.siteType = siteType;
  }
  getSiteType() {
      return this.siteType || 'mobile';
  }
  setOsType(osType) {
      this.osType = osType;
  }
  getOsType() {
      return this.osType || '';
  }
}
let instance
export default function createRequest() {
  if (instance) {
      return instance;
  }
  instance = new Request();
  return instance;
}