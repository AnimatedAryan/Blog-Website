import { useState } from 'react';
import { Button, FileInput, Select, TextInput, Alert } from 'flowbite-react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'uncategorized',
    content: '',
    image: null,
  });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const postData = {
      title: formData.title,
      category: formData.category,
      content: formData.content,
    };
  
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Set content type to JSON
        },
        body: JSON.stringify(postData), // Send form data as JSON
      });
  
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || 'Failed to publish the post.');
        return;
      }
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong while publishing the post.');
    }
  };
  
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Title and Category */}
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='Basic'>Basic</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>

        {/* File Upload */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={handleFileChange}
          />
        </div>

        {/* Content Editor */}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          className='h-72 mb-12'
          required
        />

        {/* Submit Button */}
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>

        {/* Error Alert */}
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
