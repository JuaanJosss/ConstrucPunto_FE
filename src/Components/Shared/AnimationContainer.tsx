import { motion } from "motion/react";

export default function AnimationContainer({ children, classToAdd: classToAdd = 'bg-gray-100' }: { children: React.ReactNode, classToAdd?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: .3 }}
            className={`${classToAdd}  overflow-hidden`}>
            {children}
        </motion.div>
    )
}