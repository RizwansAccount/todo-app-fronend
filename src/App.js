import React, { useState } from 'react'
import CustomModal from './components/modal';
import { useAddNoteMutation, useDeleteNoteMutation, useGetAllNotesQuery, useUpdateNoteMutation } from './redux/storeApis';

const App = () => {

  const { data: allNotes, isLoading: isLoadingAllNotes } = useGetAllNotesQuery();

  const [addNote, { isLoading: isLoadingAddNote }] = useAddNoteMutation();
  const [deleteNote, { isLoading: isLoadingDeleteNote }] = useDeleteNoteMutation();
  const [updateNote, { isLoading: isLoadingUpdateNote }] = useUpdateNoteMutation();

  const [note, setNote] = useState('');
  const [updateNoteInput, setUpdateNoteInput] = useState('');
  const [updateModal, setUpdateModal] = useState({ status: false, id: null });
  const [deleteModal, setDeleteModal] = useState({ status: false, id: null });

  const isExistNotes = allNotes?.length > 0;

  const fnAddNote = async () => {
    if (note) {
      try {
        setNote('');
        await addNote({ note });
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Please write some note to add')
    }
  };

  const fnDeleteNote = async () => {
    try {
      await deleteNote(deleteModal?.id);
    } catch (error) {
      console.log(error)
    } finally {
      setDeleteModal({status : false, id : null})
    }
  };

  const fnUpdateNote = async () => {
    try {
      await updateNote({ id: updateModal.id, data: { note: updateNoteInput } });
    } catch (error) {
      console.log(error)
    } finally {
      setUpdateNoteInput('');
      setUpdateModal({ status: false, id: null });
    }
  };

  return (
    <>

      <div className='flex flex-col items-center h-full w-full'>

        <div className='w-[400px] mt-[10vh] flex justify-between gap-[8px]'>
          <input value={note} placeholder='write note'
            onKeyDown={(e) => { if (e.key === 'Enter') { fnAddNote(); } }}
            onChange={(e) => setNote(e.target.value)}
            className='border pl-[8px] py-[6px] w-full text-[14px]'
          />
          <button className='bg-[#4A6DA7] px-[8px] rounded-[4px] flex items-center justify-center text-[11px] font-bold text-white min-w-[60px]' onClick={fnAddNote}>
            {isLoadingAddNote ? 'Loading' : 'Add'}
          </button>
        </div>

        <div className='bg-[#F2F2F2] rounded-[8px] w-[400px] h-[60vh] overflow-y-auto mt-[20px]' >
          {isLoadingAllNotes ? 'Loading...'
            : isExistNotes ? allNotes?.map((item) => {
              const noteId = item?._id;
              return (
                <div className='flex justify-between p-[14px]' key={noteId}>
                  <span className='text-[14px] cursor-pointer' >{item?.note}</span>
                  <div className='flex gap-[8px]'>
                    <button onClick={() => { setUpdateNoteInput(item?.note); setUpdateModal({ status: true, id: noteId }) }} >
                      <i class="ri-pencil-line"></i>
                    </button>
                    <button onClick={() => setDeleteModal({ id : noteId , status : true })} >
                      <i class="ri-delete-bin-6-line"></i>
                    </button>
                  </div>
                </div>
              )
            }) : <div className='flex w-full h-full items-center justify-center' >
              {'No Notes'}
            </div>}
        </div>

      </div>

      <CustomModal open={updateModal.status} onClose={() => setUpdateModal({ status: false, id: null })} >
        <div className='mt-[20px] flex flex-col gap-[24px]' >
          <input
            placeholder='Enter Note'
            className='py-[6px] pl-[8px] border mt-[24px]'
            value={updateNoteInput}
            onChange={(e) => setUpdateNoteInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { fnUpdateNote(); } }}
          />
          <button className='bg-[#4A6DA7] text-white py-[4px] rounded-[4px]' onClick={fnUpdateNote} >
            {isLoadingUpdateNote ? 'Loading' : 'Update'}
          </button>
        </div>
      </CustomModal>

      <CustomModal title='Delete Note' open={deleteModal.status} onClose={() => setDeleteModal({ status: false, id: null })} >
        <div className='mt-[20px] flex flex-col gap-[24px]' >
          <span> Are you sure to want to delete this note ? </span>
          <button className='bg-[red] text-white py-[4px] rounded-[4px]' onClick={fnDeleteNote} >
            {isLoadingDeleteNote ? 'Loading' : 'Delete'}
          </button>
        </div>
      </CustomModal>

    </>
  )
}

export default App