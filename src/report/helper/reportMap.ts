export function reportMap(data: any){
    return{
        id: data.id,
        report: data.report,
        reason: data.reason,
        user: {
            id: data.user_id,
            username: data.username
        },
        items: {
            id: data.items_id,
            image: data.image
        }
    }
}