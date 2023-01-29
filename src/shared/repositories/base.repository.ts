export default interface BaseRepository<Payload, Entity> {
    create(payload: Payload): Promise<Entity>
    update(id: string, payload: Partial<Payload>): Promise<Entity>
    findById(id: string): Promise<Entity | null>
    findAll(): Promise<Entity[]>
    delete(id: string): Promise<void>
}
