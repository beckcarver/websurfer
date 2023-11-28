// Beckham Carver
// Web App COSC4220, UWYO

import { useState } from "react";

export const useInput = initialvalue =>
{
    const [value, setValue] = useState(initialvalue);
    return[
        {value, onChange: e => {
                setValue(e.target.value)
            }
        },
        () => setValue(initialvalue)
    ];
}