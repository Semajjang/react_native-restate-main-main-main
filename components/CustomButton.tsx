import {Text, TouchableOpacity} from 'react-native';
import {ButtonProps} from "@/type";

const getBgVariantStyle = (variant: ButtonProps['bgVariant'])=>{
    switch (variant){
        case "secondary":
            return 'bg-gray-500';
        case "danger":
            return 'bg-red-500';
        case "success":
            return 'bg-green-500';
        case "outline":
            return 'bg-transparent border-neutral-300 border-[0.5px]';
        default:
                return "bg-[orange]"
    }
}

const getTextVariantStyle = (variant: ButtonProps['textVariant'])=>{
    switch (variant){
        case "primary":
            return 'text-white';
        case "secondary":
            return 'text-gray-100';
        case "danger":
            return 'text-red-100';
        case "success":
            return 'text-green-100';
        default:
            return "text-black"
    }
}

export const CustomButton = ({
    onPress,
    title,
    bgVariant="primary",
    textVariant="default",
    IconLeft,
    IconRight,
    className,
    ...props}
    : ButtonProps) => (
    <TouchableOpacity
    onPress={onPress} className={`w-full rounded-full p-4 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
    {...props}>
        {IconLeft && <IconLeft />}
        <Text className={`text-lg font-bold ${getTextVariantStyle}`}>{title}</Text>
        {IconRight && <IconRight />}

    </TouchableOpacity>
)