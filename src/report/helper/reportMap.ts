export function reportMap(data: any){
    return{
        id: data.id,
        proof: data.proof,
        reason: data.reason,
        user: {
            id: data.user_id,
            username: data.username,
            email: data.email
        },
        items: {
            id: data.item_id,
            image: data.image
        }
    }
}