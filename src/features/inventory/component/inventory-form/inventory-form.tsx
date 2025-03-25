import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { categoryOptions, locationOptions, tags } from '../../services/inventory-service';
import { GeneralInfoForm } from './general-info-form';
import { AdditionalInfoForm } from './additional-info-form';
import { ImageUploader } from '../image-uploader/image-uploader';
import { Check, ChevronLeft } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="w-full flex justify-center mb-6">
      <div className="w-96">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-base font-semibold mb-2 ${
                    index <= currentStep ? 'bg-primary text-white' : 'bg-card text-black'
                  } ${index < currentStep ? 'cursor-pointer' : ''}`}
                  onClick={() => index < currentStep && onStepChange(index)}
                >
                  {index < currentStep ? <Check size={16} /> : index + 1}
                </div>
                <span className="text-base font-semibold text-center">{step}</span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 -mt-8">
                  <div className={`h-full ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
interface InventoryItem {
  itemName: string;
  category: string;
  supplier: string;
  itemLoc: string;
  price: string;
  status: string;
  stock: number;
  images: string[];
  warranty: boolean;
  replacement: boolean;
  discount: boolean;
  tags: string[];
}

export function InventoryForm() {
  const steps = ['General info', 'Additional info'];
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<InventoryItem>({
    itemName: '',
    category: categoryOptions[0],
    supplier: '',
    itemLoc: locationOptions[0],
    price: '',
    status: 'active',
    stock: 0,
    images: [],
    warranty: true,
    replacement: true,
    discount: false,
    tags: [],
  });

  const navigate = useNavigate();

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddImages = (newImages: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleDeleteImage = (image: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== image),
    }));
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-[18px] flex items-center text-base text-high-emphasis md:mb-[24px] gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-card/60 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
        </Button>
        <h3 className="text-2xl font-bold tracking-tight">Add item</h3>
      </div>

      <div className="container mx-auto py-6">
        <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />

        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <Card className="w-full border-none rounded-lg justify-center flex shadow-sm mb-6">
              <CardContent className="pt-6 w-[774px]">
                <GeneralInfoForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  categoryOptions={categoryOptions}
                  locationOptions={locationOptions}
                />
                <ImageUploader
                  images={formData.images}
                  onAddImages={handleAddImages}
                  onDeleteImage={handleDeleteImage}
                />
                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    className="h-10 font-bold"
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={goToNextStep}
                    className="bg-primary h-10 font-bold"
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 1 && (
            <Card className="w-full border-none rounded-lg flex justify-center shadow-sm mb-6">
              <CardContent className="w-[774px]">
                <AdditionalInfoForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  tags={tags}
                  handleTagToggle={(tag) =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: prev.tags.includes(tag)
                        ? prev.tags.filter((t) => t !== tag)
                        : [...prev.tags, tag],
                    }))
                  }
                />
                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    className="h-10 font-bold"
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      className="h-10 font-bold"
                      variant="outline"
                      onClick={goToPreviousStep}
                    >
                      Previous
                    </Button>
                    <Button type="submit" className="h-10 bg-primary font-bold">
                      Finish
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
}
