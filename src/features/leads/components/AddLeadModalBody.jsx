import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../leadSlice";

const INITIAL_LEAD_OBJ = {
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "",
};

function AddLeadModalBody({ closeModal }) {
    const dispatch = useDispatch();
    //const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

    const saveNewLead = () => {
        // if (leadObj.first_name.trim() === "") return setErrorMessage("First Name is required!");
        // else if (leadObj.email.trim() === "") return setErrorMessage("Email id is required!");

        dispatch(addNewLead({ newLeadObj: leadObj }));
        dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
        closeModal();
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLeadObj({ ...leadObj, [updateType]: value });
    };

    return (
        <>
            <InputText
                type="text"
                defaultValue={leadObj.name}
                updateType="name"
                containerStyle="mt-4"
                labelTitle="Name"
                updateFormValue={updateFormValue}
            />

            <InputText
                type="text"
                defaultValue={leadObj.description}
                updateType="description"
                containerStyle="mt-4"
                labelTitle="Description"
                updateFormValue={updateFormValue}
            />
            <InputText
                type="number"
                defaultValue={leadObj.price}
                updateType="price"
                containerStyle="mt-4"
                labelTitle="Price"
                updateFormValue={updateFormValue}
            />
            <InputText
                type="text"
                defaultValue={leadObj.category}
                updateType="category"
                containerStyle="mt-4"
                labelTitle="Category"
                updateFormValue={updateFormValue}
            />
            <inpu type="file" className="file-input my-8" />

            {/* <InputText type="email" defaultValue={leadObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/> */}

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>
                    Cancel
                </button>
                <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
                    Save
                </button>
            </div>
        </>
    );
}

export default AddLeadModalBody;
