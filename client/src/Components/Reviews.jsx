import React, { useContext, useState, useEffect } from "react";
import { CgAttachment } from "react-icons/cg";
import { Context } from "../Context/Context";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Reviews({ id }) {
  const { user, Authentication } = useContext(Context);
  const [editReviewId, setEditReviewId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = useState({ review: "", file: "" });
  const [previewUrl, setPreviewUrl] = useState("");
  const [update, setUpdate] = useState({ review: "", file: "" });

  const handleUpdate = (e) => {
    const name = e.target.name;
    const file = e.target.files?.[0];

    if (name === "file" && file) {
      setUpdate((prev) => ({ ...prev, file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setUpdate((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const file = e.target.files?.[0];

    if (name === "file" && file) {
      setValue((prev) => ({ ...prev, file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setValue((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const sendReview = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("review", value.review);
    formData.append("file", value.file);
    formData.append("user", user._id);

    try {
      await axios.post(
        `http://localhost:3000/reviews/reviews/${id}`,
        formData,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );
      setValue({ review: "", file: "" });
      setPreviewUrl("");
      getReviews();
    } catch (err) {
      console.error("Review submission failed", err);
    }
  };

  const getReviews = async () => {
    const response = await axios.get(
      `http://localhost:3000/reviews/getReviewsById/${id}`,
      {
        headers: {
          Authorization: Authentication,
        },
      }
    );
    setReviews(response.data);
  };

  const updateReview = async (e, reviewId) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("user", user._id);
      formData.append("file", update.file);
      formData.append("review", update.review);
      formData.append("product", id);
      const response = await axios.put(
        `http://localhost:3000/reviews/updateReviewsById/${reviewId}`,
        formData,
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );

      setEditReviewId(null);
      // setUpdate({ review: "", file: "" });
      setPreviewUrl("");
      getReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReview = async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/reviews/deleteReviews/${id}`,
      {
        headers: {
          Authorization: Authentication,
        },
      }
    );
    getReviews();
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1498654201194-1000f8b10dcd')] bg-cover bg-center flex flex-col items-center justify-center px-4 py-12">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-70 -z-10"></div>

      <form
        onSubmit={sendReview}
        className="w-full max-w-[60vw] p-4 rounded-3xl shadow-2xl bg-white/90 border border-white/50 space-y-6"
      >
        <h2 className="text-4xl font-serif font-bold text-center text-[#6f4e37] drop-shadow-md">
          ☕ Share Your Café Experience
        </h2>

        <div>
          <label className="block text-lg font-medium text-[#6f4e37] mb-1">
            Upload Image or File
          </label>
          <div className="flex items-center gap-2">
            <label
              htmlFor="attachment"
              className="cursor-pointer text-2xl text-[#a97456] hover:text-[#6f4e37] transition"
            >
              <CgAttachment />
            </label>
            <input
              onChange={handleChange}
              type="file"
              id="attachment"
              name="file"
              className="hidden"
            />
            <span className="text-sm text-[#7a5c3b]">
              {value.file ? (
                <img src={previewUrl} className="h-[10vh] object-contain" />
              ) : (
                "No file chosen"
              )}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-[#6f4e37] mb-1">
            Your Review
          </label>
          <textarea
            name="review"
            placeholder="What did you love about the coffee or ambiance?"
            value={value.review}
            onChange={handleChange}
            className="w-full h-32 px-4 py-2 bg-white bg-opacity-80 text-[#4b3b28] placeholder-[#bba17f] border border-[#a97456] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a97456] resize-none shadow-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#a97456] hover:bg-[#6f4e37] text-white font-semibold py-2 rounded-lg transition duration-300 shadow-lg"
        >
          ✨ Submit Review
        </button>
      </form>

      {/* Reviews Section */}
      <div className="w-full max-w-2xl max-h-[70vh] mt-10 space-y-6 ">
        <h3 className="text-3xl font-serif font-semibold text-[#6f4e37] drop-shadow-md">
          💬 What People Are Saying
        </h3>

        <div className="space-y-4 h-[35vh] overflow-y-auto pr-2">
          {reviews.length === 0 ? (
            <p className="text-[#7a5c3b]">No reviews yet. Be the first!</p>
          ) : (
            reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white bg-opacity-80 border border-[#d1c4b2] p-4 rounded-xl text-[#4b3b28] shadow-md"
              >
                <div className=" flex w-full items-centre justify-between ">
                  <p className="font-semibold">
                    {r.user?.fullName || "Guest"}:
                  </p>
                  {user._id === r.user?._id ? (
                    <>
                      <FaEdit
                        onClick={() => {
                          setEditReviewId(r._id);
                          setUpdate({ review: r.review || "", file: "" });
                        }}
                      />

                      <MdDelete
                        onClick={() => {
                          deleteReview(r._id);
                        }}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>

                {r._id === editReviewId ? (
                  <form
                    onSubmit={(e) => {
                      updateReview(e, r._id);
                    }}
                  >
                    <input
                      type="text"
                      value={update.review}
                      name="review"
                      onChange={handleUpdate}
                    />
                    <input
                      type="file"
                      name="file"
                      onChange={handleUpdate}
                      className="block mb-1"
                    />

                    {previewUrl && (
                      <img
                        src={previewUrl}
                        className="h-[10vh] object-contain"
                      />
                    )}

                    {!previewUrl && r.attachments && (
                      <img
                        src={r.attachments.url}
                        className="h-[10vh] object-contain"
                      />
                    )}

                    <button
                      type="submit"
                      className="bg-[#a97456] text-white px-3 py-1 rounded hover:bg-[#6f4e37]"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <p className="italic">“{r.review}”</p>

                    {r.attachments && (
                      <img src={r.attachments.url} className=" h-[10vh]" />
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
