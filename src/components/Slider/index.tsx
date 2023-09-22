import { 
    Slider, SliderFilledTrack, 
    SliderThumb, SliderTrack, Tooltip 
} from '@chakra-ui/react'
import { useField } from 'formik'
import React from 'react'

const SliderWrapper:React.FC<any> = (props) => {
    const [field, meta, {setValue}] = useField(props);
    const [showTooltip, setShowTooltip] = React.useState(false)
    return (
        <Slider
            id='slider'
            {...field}
            min={0}
            max={100}
            colorScheme='blue'
            onChange={(v) => {setValue(v)}}
            onBlur={() => {setShowTooltip(false)}}
            onFocus={() => {setShowTooltip(true)}}
        >   
            <SliderTrack><SliderFilledTrack /></SliderTrack>
            <Tooltip
                hasArrow
                bg='blue.500'
                color='white'
                placement='top'
                isOpen={showTooltip}
                label={`${field.value}`}
            >
                <SliderThumb />
            </Tooltip>
        </Slider>
    )
}

export default SliderWrapper