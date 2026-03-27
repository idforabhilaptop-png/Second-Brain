
const Input = ({ value, onChange, placeholder }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }) => {
    return (
        <div>
            <input type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="py-2 px-3.5 rounded-sm border border-slate-500 w-[90%]"
            />
        </div>
    )
}
export default Input