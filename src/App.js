import React, { useEffect, useState } from 'react'
import useApiManager from './hooks/useApiManager'
import CustomModal from './components/modal';

const App = () => {

  const { fnApiCall } = useApiManager();

  const [loading, setLoading] = useState({ type: "" });
  const [allNotes, setAllNotes] = useState([]);
  const [note, setNote] = useState('');
  const [updateNote, setUpdateNote] = useState('');
  const [updateModal, setUpdateModal] = useState({ status: false, id: null });

  const isExistNotes = allNotes?.length > 0;

  useEffect(() => { fnGetAllNotes() }, []);

  const fnGetAllNotes = async () => {
    try {
      const result = await fnApiCall('note');
      setAllNotes(result?.data);
    } catch (error) {
      console.log('error ========>', error);
    } finally {
      setLoading({ type: "" });
    }
  };

  const fnAddNote = async () => {
    if (note) {
      try {
        setLoading({ type: "add" });
        setNote('');
        await fnApiCall({ endpoint: 'note', method: 'POST', body: { note } });
      } catch (error) {
        console.log(error)
      } finally {
        fnGetAllNotes();
      }
    } else {
      alert('Please write some note to add')
    }
  };

  const fnDeleteNote = async (id) => {
    try {
      setLoading({ type: "delete" });
      await fnApiCall({ endpoint: `note/${id}`, method: 'DELETE' });
    } catch (error) {
      console.log(error)
    } finally {
      fnGetAllNotes();
    }
  };

  const fnUpdateNote = async () => {
    try {
      setLoading({ type: "update" });
      await fnApiCall({ endpoint: `note/${updateModal.id}`, method: 'PATCH', body: { note: updateNote } });
    } catch (error) {
      console.log(error)
    } finally {
      setUpdateNote('');
      fnGetAllNotes();
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
          <button className='bg-[#4A6DA7] px-[8px] rounded-[4px] flex items-center justify-center text-[10px] font-bold text-white min-w-[60px]' onClick={fnAddNote}>
            {loading.type === 'add' ? 'Loading' : 'Add'}
          </button>
        </div>

        <div className='bg-[#F2F2F2] rounded-[8px] w-[400px] h-[60vh] overflow-y-auto mt-[20px]' >
          {isExistNotes ? allNotes?.map((item) => {
            const noteId = item?._id;
            return (
              <div className='flex justify-between p-[12px]' key={noteId}>
                <span className='text-[14px] cursor-pointer' >{item?.note}</span>
                <div className='flex gap-[8px]'>
                  <button onClick={() => { setUpdateNote(item?.note); setUpdateModal({ status: true, id: noteId }) }} >
                    <i class="ri-pencil-line"></i>
                  </button>
                  <button onClick={() => fnDeleteNote(noteId)} >
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
            value={updateNote}
            onChange={(e) => setUpdateNote(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { fnUpdateNote(); } }}
          />
          <button className='bg-[#4A6DA7] text-white py-[4px] rounded-[4px]' onClick={fnUpdateNote} >
            {loading.type === 'update' ? 'Loading' : 'Update'}
          </button>
        </div>
      </CustomModal>

    </>
  )
}

export default App