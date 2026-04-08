export function mapItem(item: any) {
    return {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        location: item.location,
        status: item.status,
        category: item.category,
        user: {
            id: item.user_id,
            username: item.username

        }
    }
}

