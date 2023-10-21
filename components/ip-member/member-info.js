import Image from "next/image";

export default function MemberItem({data}){

    const seq = data.user_seq
    const imageSrc = data?.image_src
    const email = data.email
    const name = data.name
    const birth = data.birth
    const hp = data.hp
    const address = data.address
    const regDttm = data.reg_dttm
    const modDttm = data.mod_dttm
    
    return (
        <div className="project-card">
            {/* <Image
                className="rounded-t-xl"
                src={imageSrc}
                alt="cover image"
                width="100%"
                height="30%"
            /> */}

            <div className="p-4 flex flex-col">
                <h1 className="text-2xl font-bold">{name}</h1>
                <h3 className="mt-4 text-xl">{email}</h3>
                <p className="my-1 ">
                    등록: {regDttm}
				</p>
				<p className="my-1 ">
                    수정: {modDttm}
                </p>
                <div className="flex items-start mt-2">
                    
                    {
                        // tags.map((aTag) => (
                        //     <h1 className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 w-30" key={aTag.id}>{aTag.name}</h1>
                        // ))
                    }
                </div>

            </div>

        </div>
    );
}
