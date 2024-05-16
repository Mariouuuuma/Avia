import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import supabase from "../../../Utils/api";
import ButtonUpload from "../ButtonUpload/ButtonUpload";
import UserInfo from "../../RightSideBar/UserInfo";
import { SideBarContext } from "../../../Contexts/SideBarContext";
var FileName: string;
export default function EditInfo() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [newFN, setNewfn] = useState<any>();
  const [newLN, setNewln] = useState<any>();
  const [deleteClick, setDeleteClick] = useState<boolean>(false);
  const { showForm, setShowForm } = useContext(SideBarContext);

  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [userData, setUserData] = useState<any>({});
  const [passwordInput, setPasswordInput] = useState("NouveauMotDePasst");
  let PasswordValue = "";
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      FileName = file.name;
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFileName(file.name);
      console.log("Fichier sélectionné :", file.name);
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleDeleteUpload = () => {
    setSelectedImage(undefined);
  };

  const retrieveUserData = async () => {
    try {
      const user = supabase.auth.getUser();
      //console.log("Informations sur l'utilisateur:", user);
      const { data, error } = await supabase
        .from("Agents")
        .select("*")
        .eq("Email", (await user).data.user?.email);

      if (error) {
        throw error;
      }
      setUserData(data[0]);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'utilisateur:",
        error
      );
    }
  };
  /*const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };*/

  const handleFirstname = (e: ChangeEvent<HTMLInputElement>) => {
    setNewfn(e.target.value);
  };

  const handleLastname = (e: ChangeEvent<HTMLInputElement>) => {
    setNewln(e.target.value);
  };

  const handleClickSave = async () => {
    try {
      const { error } = await supabase
        .from("Agents")
        .update({
          firstName: newFN,
          lastName: newLN,
          Email: userData.Email,
          Password: passwordInput,
          Department: selectedDepartment,
          PhotoUrl: selectedImage,
        })
        .eq("Email", userData.Email);
      if (error) {
        throw error;
      }

      console.log("Insertion réussie!");
    } catch (error) {
      console.error(
        "Erreur lors de l'inertion des nouvelles données de l'utilisateur:",
        error
      );

      // Vérifier si apiError est une instance de Error avant d'accéder à sa propriété message
      if (error instanceof Error) {
        setError(error.message); // Stocker le message d'erreur dans le state
      } else {
        // Si ce n'est pas une instance de Error, stocker apiError lui-même
        setError(JSON.stringify(error));
      }
    }
    setShowForm(false);
  };

  useEffect(() => {
    retrieveUserData();
  }, [userData]);

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handlePasswordChange = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: passwordInput,
    });
    PasswordValue = passwordInput;
    if (error) {
      console.error(
        "Erreur lors de la mise à jour du mot de passe :",
        error.message
      );
    } else {
      console.log("Mot de passe mis à jour avec succès.");
    }
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOptionName = e.target.options[selectedIndex].text;
    setSelectedDepartment(selectedOptionName);
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        right: "60%",
        zIndex: "9999",
      }}
    >
      <div
        style={{
          width: "40rem",
          height: "38rem",
          backgroundColor: "white",
          padding: "2.5rem",
          marginTop: "4.25rem",
          borderRadius: "3%",
          border: "1px solid #E73737",
        }}
      >
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2
                className="text-base font-semibold leading-7 text-gray-900"
                style={{ marginBottom: "-1rem" }}
              >
                Personal Information
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <div className="h-14 w-14 rounded-full bg-gray-300">
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Profile"
                          className="h-14 w-14 rounded-full object-cover"
                        />
                      ) : userData.PhotoUrl && !selectedImage ? (
                        <img
                          src={userData.PhotoUrl}
                          alt="Profile"
                          className="h-14 w-14 rounded-full object-cover"
                        />
                      ) : (
                        deleteClick && (
                          <UserCircleIcon
                            className="h-14 w-14"
                            aria-hidden="true"
                          />
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={handleFileUpload}
                    >
                      Change
                    </button>

                    <button
                      onClick={handleDeleteUpload}
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                style={{ marginTop: "-1rem" }}
              >
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleFirstname}
                      type="text"
                      name="first-name"
                      defaultValue={userData.firstName || ""}
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleLastname}
                      type="text"
                      name="last-name"
                      defaultValue={userData.lastName || ""}
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={userData.Email || ""}
                      name="Email"
                      id="Email"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Department
                  </label>
                  <div className="mt-2">
                    <select
                      onChange={handleDepartmentChange}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>IT</option>
                      <option>Dep2</option>
                      <option>Dep3</option>
                    </select>
                  </div>
                </div>
                {error && (
                  <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
                <div className="col-span-full">
                  {" "}
                  {/* Ajout d'une nouvelle div */}
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {" "}
                    <input
                      type="password"
                      name="password"
                      defaultValue={passwordInput}
                      onChange={handlePasswordInputChange}
                      id="password"
                      autoComplete="new-password"
                      className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      onClick={handlePasswordChange}
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>{" "}
            </div>
            <div>
              <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                style={{ marginTop: "-1rem" }}
              >
                {/* Other input fields */}
              </div>
            </div>
          </div>

          <div
            className="mt-6 flex items-center justify-end gap-x-6"
            style={{ marginTop: "-1rem" }}
          >
            <button
              onClick={() => {
                setShowForm(false);
              }}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 border border-gray-300 rounded-md px-3 py-2 hover:border-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleClickSave}
              type="button"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Save
            </button>
          </div>
        </form>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          ref={fileInputRef}
        />
      </div>
    </div>
  );
}
