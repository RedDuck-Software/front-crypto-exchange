import Entity from '@/interfaces/Entity'

export default interface CommonSelectBox extends Entity{
    value: string;
    isAllowed: boolean;
    icon: string;
    logo: string;
}
