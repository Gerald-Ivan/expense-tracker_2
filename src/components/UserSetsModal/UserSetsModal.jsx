import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
  changeAvatar,
  removeAvatar,
} from '../../redux/user/operations';
import { getUser, getIsLoading } from '../../redux/user/selectors';
import svg from '../../assets/images/icons.svg';
import Modal from '../Modal/Modal';
import css from './UserSetsModal.module.css';

export const UserSetsModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const user = useSelector(getUser);
    const [formData, setFormData] = useState(user);
    const [isUploading, setIsUploading] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
      if (user) {
        setFormData(user);
      }
    }, [user]);

    const handleSelectFocus = () => {
      setIsOptionOpen(true);
    };

    const handleSelectBlur = () => {
      setIsOptionOpen(false);
    };

    const handleInputChange = e => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleImageClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleFileChange = e => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    };

    const handleUploadAvatar = async () => {
      setIsUploading(true); // Set uploading state
      if (selectedFile) {
        await dispatch(changeAvatar(selectedFile));
        setSelectedFile(null);
        setIsUploading(false);
        onClose();
      }
    };

    const handleRemoveAvatar = async () => {
      setIsRemoving(true); // Set removing state
      if (user._id) {
        await dispatch(removeAvatar(user._id));
        onClose();
        setIsRemoving(false);
      }
    };

    const handleSubmit = async e => {
      e.preventDefault();
      await dispatch(updateUser(formData));
      onClose();
    };

    const tempProfile = (onClick) => (
      <svg className={css.tempProfile} width={100} height={100} onClick={onClick}>
        <use
          href={`${svg}#user-bold`}
        />
      </svg>
    );


    return (
      <Modal isOpen={isOpen} onClose={onClose}
      >
        <div className={css.container}>

          <h2>
            Profile settings
          </h2>

          <form className={css.formContainer} onSubmit={handleSubmit}>
            <div className={css.imageContainer}>
              <input
                id="changeAvatar"
                type="file"
                ref={inputRef}
                accept=".jpg, .jpeg, .png"
                disabled={isLoading}
                className="visually-hidden"
                onChange={handleFileChange}
              />
              {!selectedFile && !formData.avatarUrl && tempProfile(handleImageClick)}

              {(selectedFile || formData.avatarUrl) &&
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : formData.avatarUrl
                  }
                  alt="User Avatar"
                  onClick={handleImageClick}
                />}

              {/* Avatar Buttons */}
              <div className={css.uploadButtons}>
                <button
                  type="button"
                  onClick={handleUploadAvatar}
                  disabled={!selectedFile || isUploading}

                >
                  {isUploading ? 'Uploading...' : 'Upload new photo'}
                </button>
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  disabled={!formData.avatarUrl || isRemoving}
                >
                  {isRemoving ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>

            <div className={css.nameContainer}>
              <div style={{ position: 'relative' }}>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  onFocus={handleSelectFocus}
                  onBlur={handleSelectBlur}
                >
                  <option value="uah">
                    ₴ UAH
                  </option>
                  <option value="usd">
                    $ USD
                  </option>
                  <option value="eur">
                    € EUR
                  </option>
                </select>
                <svg
                  width={20}
                  height={20}
                >
                  <use
                    href={`${svg}${
                      isOptionOpen ? '#chevron-up' : '#chevron-down'
                    }`}
                  />
                </svg>
              </div>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="primary-button"
            >
              {isLoading ? <div>Saving...</div> : 'Save'}
            </button>
          </form>
        </div>
      </Modal>
    );
  }
;
