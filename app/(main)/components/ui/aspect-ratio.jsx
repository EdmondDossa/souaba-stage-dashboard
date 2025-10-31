import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = React.forwardRef(({ className, children, ...props }, ref) => (
    <AspectRatioPrimitive.Root ref={ref} className={className} {...props}>
        {children}
    </AspectRatioPrimitive.Root>
));

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
