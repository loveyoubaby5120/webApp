
export const IsDeviceWechat = () => {
    const ua = navigator.userAgent.toLowerCase();
    return /micromessenger/i.test(ua);
}
