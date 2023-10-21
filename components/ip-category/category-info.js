export default function CategoryItem({data}){

    const id = data.id
    const name = data.name
    const code = data.code
    const regDttm = data.reg_dttm
    const modDttm = data.mod_dttm
    
    return (
        <div className="project-card">
            <div className="p-4 flex flex-col">
                <h1 className="text-2xl font-bold">{name}</h1>
                <h3 className="mt-4 text-xl">{code}</h3>
                <p className="my-1 ">
                    등록: {regDttm}
				</p>
				<p className="my-1 ">
                    수정: {modDttm}
                </p>
            </div>

        </div>
    );
}
