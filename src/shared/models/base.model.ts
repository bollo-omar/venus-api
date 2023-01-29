export interface BaseModel {
    readonly id: string;
    readonly createdAt: Date | null;
    readonly updatedAt: Date | null;
}