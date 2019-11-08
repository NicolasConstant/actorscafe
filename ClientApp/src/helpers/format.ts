export function format(text: string) {
    return text.replace(/(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/g, "<a rel=\"noopener nofollow\" target=\"_blank\" href=\"$&\">$&</a>")
        .replace(/@\w([\w-]*\w)?(?:@[\w.\-]+\w)?/g, `<a href="${window.location.origin}/$&">$&</a>`)
        .replace(/\n/g, "<br />")
        .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}