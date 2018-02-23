export function humanTime(t: Date): string {
    const now = new Date();
    const diff = (now.getTime() - t.getTime()) / 1000;

    if (diff < 0) {
        return '未来';
    }

    if (diff < 60) {
        return '刚刚';
    }
    if (diff < 60 * 60) {
        return `${Math.round(diff / 60)}分钟前`;
    }
    if (diff < 60 * 60 * 24) {
        return `${Math.round(diff / 60 / 60)}小时前`;
    }
    if (diff < 60 * 60 * 24 * 30) {
        return `${Math.round(diff / 60 / 60 / 24)}天前`;
    }
    if (diff < 60 * 60 * 24 * 365) {
        return `${Math.round(diff / 60 / 60 / 24 / 30)}个月前`;
    }
    return `${Math.round(diff / 60 / 60 / 24 / 365)}年前`;
}

export function absoluteHumanTime(t: Date): string {
    return `${t.getFullYear()}.${t.getMonth() + 1}.${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;
}
